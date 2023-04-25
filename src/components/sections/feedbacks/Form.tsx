import React, { useMemo, useState } from "react";
import GithubLinkInput from "../../ui/GithubLinkInput";
import MarkdownIcon from "../../ui/MarkdownIcon";
import ArrowButton from "../../ui/button/Arrow";
import { useTranslation } from "next-i18next";
import TextInput from "../../ui/TextInput";
import Avatar from "../../ui/Avatar";
import { useSelector } from "@/hooks/useTypedSelector";
import { useForm } from "react-hook-form";
import api from "@/config/api";
import { createEvent } from "@/store/feature/events.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";

/**
 * FormValues Intercase
 * @date 4/25/2023 - 2:24:08 PM
 *
 * @interface FormValues
 * @typedef {FormValues}
 */
interface FormValues {
  feedback: string;
  githubLink: string;
}

/**
 * FormProps Intercase
 * @date 4/25/2023 - 2:24:24 PM
 *
 * @interface FormProps
 * @typedef {FormProps}
 */
interface FormProps {
  save: (data: any) => void;
}

/**
 * Form Intercase
 * @date 4/25/2023 - 2:24:41 PM
 *
 * @export
 * @param {FormProps} { save }
 * @returns {*}
 */
export default function Form({ save }: FormProps) {
  const {
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { t } = useTranslation();

  const [githubLink, setgithubLink] = useState("");
  const [saving, setsaving] = useState(false);

  const community = useSelector((state) => state.community.current);

  const user = useSelector((state) => state.user.data);

  const colors = useSelector((state) => state.ui.colors);

  const activeButtonStyle = useMemo(
    () => ({
      borderColor: colors.textAccent,
      color: colors.text,
      backgroundColor: colors.textAccent,
      "--button-color--hover": colors.text,
      "--button-background-color--hover": colors.accent,
      "--button-border-color--hover": colors.accent,
    }),
    [colors]
  );

  const submission: any = [];

  const dispatch = useDispatch();

  const submit = async () => {
    if (!saving) {
      setsaving(true);
      await api()
        .client.post(`feedbacks/create`, {
          submission_id: submission.id,
          text: feedback,
          link: githubLink,
        })
        .then((response: any) => {
          const data = {
            name: "feedback-created",
            attributes: {
              feedbackId: response.id,
              submissionId: submission.id,
              community: community!.slug,
            },
          };
          dispatch(createEvent(data));
          reset();
          setsaving(false);
          save(response);
        })
        .catch((error) => {
          //   setErros(error.details);
          setsaving(false);
          if (error.details) {
            // form.setErrors(error.details);
          }
        });
    }
  };

  const [feedback, setfeedback] = useState("");
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="relative w-full">
          <div className="relative">
            <div className="absolute z-50 left-3 md:-left-7 top-3">
              <Avatar user={user} size="medium" />
            </div>
          </div>
          <div label-for="input-text">
            <TextInput
              id="input-text"
              value={feedback || ""}
              placeholder={
                t(
                  "communities.challenge.submission.feedback.placeholder.text"
                ) || ""
              }
              inputClass="border-t-0"
              error={errors.feedback?.message}
              onInput={(value) =>
                setfeedback(value.currentTarget.value)
              }
              {...register("feedback", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "The password is too short",
                },
              })}
            />
          </div>
          {submission.challenge.format.githubLink && (
            <div label-for="input-github">
              <GithubLinkInput
                id="input-github"
                value={githubLink}
                is-github-link
                error={errors.githubLink?.message || ""}
                handleInput={(e) => setgithubLink(e.target.value)}
                className="p-0 border border-t-0 border-solid border-gray-200 focus:outline-none outline-none active:border-none focus:border-none block m-0 flex-grow w-full placeholder-gray-400 placeholder-opacity-100"
                placeholder={
                  t(
                    "communities.challenge.submission.githubLink.placeholder.github"
                  ) || ""
                }
                {...register("githubLink", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "The password is too short",
                  },
                })}
              />
            </div>
          )}

          <div>
            <MarkdownIcon />
          </div>
          <div className="text-right mt-5">
            <ArrowButton
              disabled={saving}
              customStyle={activeButtonStyle}
              loading={saving}
            >
              {t("submit")}
            </ArrowButton>
          </div>
        </div>
      </form>
    </div>
  );
}
