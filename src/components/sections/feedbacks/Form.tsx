import { ReactElement, useEffect, useMemo, useState } from "react";
import GithubLinkInput from "@/components/ui/GithubLinkInput";
import MarkdownIcon from "@/components/ui/MarkdownIcon";
import ArrowButton from "@/components/ui/button/Arrow";
import { useTranslation } from "next-i18next";
import TextInput from "@/components/ui/TextInput";
import Avatar from "@/components/ui/Avatar";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { useForm } from "react-hook-form";
import { createEvent } from "@/store/feature/events.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { Feedback } from "@/types/feedback";
import { createFeedback } from "@/store/feature/communities/challenges/submissions/feedback.slice";
import { Colors, Community } from "@/types/community";
import { Submission, User } from "@/types/bounty";
import { Challenge } from "@/types/course";
import { IRootState } from "@/store";

/**
 * interface for Form multiSelector
 * @date 9/13/2023 - 9:12:21 AM
 *
 * @interface FormMultiSelector
 * @typedef {FormMultiSelector}
 */
interface FormMultiSelector {
  community: Community | null;
  user: User | null;
  colors: Colors;
  submission: Submission | null;
  challenge: Challenge | null;
  userFeedback: Feedback;
}

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
  save: (data: Feedback) => void;
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
  const { community, user, colors, submission, challenge, userFeedback } = useMultiSelector<unknown, FormMultiSelector>({
    community: (state: IRootState) => state.communities.current,
    user: (state: IRootState) => state.user.data,
    colors: (state: IRootState) => state.ui.colors,
    submission: (state: IRootState) => state.submissions.current,
    challenge: (state: IRootState) => state.challenges.current,
    userFeedback: (state: IRootState) => state.feedback.current,
  });

  const activeButtonStyle = useMemo(
    () => ({
      borderColor: colors?.textAccent,
      color: colors?.text,
      backgroundColor: colors?.textAccent,
      "--button-color--hover": colors?.text,
      "--button-background-color--hover": colors?.accent,
      "--button-border-color--hover": colors?.accent,
    }),
    [colors]
  );

  const onSubmit = async (form: FormValues) => {
    const { feedback, githubLink } = form;
    if (saving) return;
    try {
      setSaving(true);
      await dispatch(
        createFeedback({
          submission_id: submission?.id as string,
          text: feedback,
          link: githubLink,
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!userFeedback) return;
    dispatch(
      createEvent({
        name: "Feedback-created",
        attributes: {
          submissionId: submission?.id,
          community: community?.slug,
          feedbackId: userFeedback.id,
        },
      })
    );
    reset();
    save(userFeedback);
  }, [userFeedback]);

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
              placeholder={t("communities.challenge.submission.feedback.placeholder.text") || ""}
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
                className="flex-grow text-lg block border-none w-full p-0 m-0 placeholder-gray-400 placeholder-opacity-100 outline-none"
                placeholder={t("communities.challenge.submission.feedback.placeholder.github") || ""}
                {...register("githubLink", {
                  required: false,
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
            <ArrowButton disabled={saving} customStyle={activeButtonStyle} loading={saving}>
              {t("submit")}
            </ArrowButton>
          </div>
        </div>
      </form>
    </div>
  );
}
