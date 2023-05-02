import { ReactElement, useMemo, useState } from "react";
import GithubLinkInput from "@/components/ui/GithubLinkInput";
import MarkdownIcon from "@/components/ui/MarkdownIcon";
import ArrowButton from "@/components/ui/button/Arrow";
import { useTranslation } from "next-i18next";
import TextInput from "@/components/ui/TextInput";
import Avatar from "@/components/ui/Avatar";
import { useSelector } from "@/hooks/useTypedSelector";
import { useForm } from "react-hook-form";
import { createEvent } from "@/store/feature/events.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { Feedback } from "@/types/feedback";
import { createFeedback } from "@/store/feature/communities/challenges/submissions/feedback.slice";

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
 * @returns {ReactElement}
 */
export default function Form({ save }: FormProps): ReactElement {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const community = useSelector((state) => state.communities.current);
  const user = useSelector((state) => state.user.data);
  const colors = useSelector((state) => state.ui.colors);
  const submission = useSelector(
    (state) => state.submissions.current
  );
  const challenge = useSelector((state) => state.challenges.current);
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

  const onSubmit = async (form: FormValues) => {
    const { feedback, githubLink } = form;
    if (saving) return;
    try {
      setSaving(true);
      const result = await dispatch(
        createFeedback({
          submission_id: challenge?.id as string,
          text: feedback,
          link: githubLink,
        })
      );
      const response = result.payload as Feedback;
      dispatch(
        createEvent({
          name: "Feedback-created",
          attributes: {
            submissionId: submission?.id,
            community: community?.slug,
            feedbackId: response.id,
          },
        })
      );
      reset();
      save(response);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative w-full">
          <div className="relative">
            <div className="absolute z-50 left-3 md:-left-7 top-3">
              <Avatar user={user} size="medium" />
            </div>
          </div>
          <div label-for="input-text">
            <TextInput
              id="input-text"
              placeholder={
                t(
                  "communities.challenge.submission.feedback.placeholder.text"
                ) || ""
              }
              inputClass="border-t-0"
              error={errors.feedback?.message}
              {...register("feedback", {
                required: "This field is required",
                minLength: {
                  value: 15,
                  message: "The feedback is too short",
                },
              })}
            />
          </div>
          {challenge?.format.githubLink && (
            <div label-for="input-github">
              <GithubLinkInput
                id="input-github"
                error={errors.githubLink?.message || ""}
                className="flex-grow block w-full p-0 m-0 placeholder-gray-400 placeholder-opacity-100 border border-t-0 border-gray-200 border-solid outline-none focus:outline-none active:border-none focus:border-none"
                placeholder={
                  t(
                    "communities.challenge.submission.githubLink.placeholder.github"
                  ) || ""
                }
                {...register("githubLink", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "The github link is too short",
                  },
                })}
              />
            </div>
          )}

          <div>
            <MarkdownIcon />
          </div>
          <div className="mt-5 text-right">
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
