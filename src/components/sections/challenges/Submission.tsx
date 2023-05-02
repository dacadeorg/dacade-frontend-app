import { CSSProperties, useState } from "react";
import Section from "@/components/sections/communities/_partials/Section";
import Avatar from "@/components/ui/Avatar";
import TextInput from "@/components/ui/TextInput";
import GithubLinkInput from "@/components/ui/GithubLinkInput";
import MarkdownIcon from "@/components/ui/MarkdownIcon";
import ArrowButton from "@/components/ui/button/Arrow";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { createSubmission } from "@/store/feature/communities/challenges/submissions";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";
import { createEvent } from "@/store/feature/events.slice";
import { Submission as TSubmission } from "@/types/bounty";

interface FormValues {
  text: string;
  githubLink: string;
}

/**
 * Submission form component
 * @date 4/18/2023 - 8:20:10 PM
 *
 * @returns {ReactElement}
 */
export default function Submission(): ReactElement {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  let githubLinkValue = watch("githubLink");
  let textValue = watch("text");
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const user = useSelector((state) => state.user.data);
  const colors = useSelector((state) => state.ui.colors);
  const challenge = useSelector((state) => state.challenges.current);
  const community = useSelector((state) => state.communities.current);

  const [submitting, setSubmitting] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);

  /**
   * Button style when it active
   * @date 4/18/2023 - 8:21:41 PM
   *
   * @type {CSSProperties}
   */
  const activeButtonStyle: CSSProperties = {
    color: colors.text,
    backgroundColor: colors.textAccent,
  };

  const disabled = submitting || (challenge?.format.disclaimer ? !checkedTerms : false);

  /**
   * Submit form function
   * @date 4/18/2023 - 8:22:10 PM
   *
   * @async
   * @param {FormValues} form
   * @returns {*}
   */
  const onSubmit = async (form: FormValues) => {
    const isValid = form.text.length > 0 && form.githubLink.length > 0;

    if (isValid) {
      if (submitting) return;
      try {
        setSubmitting(true);
        const result = await dispatch(
          createSubmission({
            challengeId: challenge?.id!,
            text: form.text,
            link: form.githubLink,
          })
        );

        const submission = result.payload as TSubmission;

        dispatch(
          createEvent({
            name: "submission-created",
            attributes: {
              submissionId: submission.id,
              community: community?.slug,
            },
          })
        );
        textValue = "";
        githubLinkValue = "";
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <Section title="communities.challenge.submission">
      <form onSubmit={handleSubmit(onSubmit)}>
        {challenge?.format && (
          <div className="relative w-full md:pl-7.5 my-6">
            <div className="absolute z-50 left-3 md:left-0 top-3">
              <Avatar user={user} size="medium" />
            </div>

            <div label-for="input-text">
              <TextInput
                id="input-text"
                value={textValue}
                placeholder={`${t("communities.challenge.submission.placeholder.text")}`}
                error={errors.text?.message as string}
                {...register("text", {
                  required: "This field is required",
                  maxLength: {
                    value: 100,
                    message: "The text is too long",
                  },
                })}
              />
            </div>
            {challenge.format.githubLink && (
              <div
                className={classNames("w-full border border-solid border-gray-200 m-0 rounded-b text-lg py-0 leading-none items-center space-x-2", {
                  "border-t-0": challenge.format.text,
                })}
              >
                <div label-for="input-github">
                  <GithubLinkInput
                    id="input-github"
                    value={githubLinkValue}
                    error={errors.githubLink?.message as string}
                    className="p-0 border-none border-transparent focus:outline-none outline-none active:border-none focus:border-none block m-0 flex-grow w-full placeholder-gray-400 placeholder-opacity-100"
                    placeholder={`${t("communities.challenge.submission.placeholder.github")}`}
                    handleInput={(e) => console.log(e)}
                    {...register("githubLink", {
                      required: "This field is required",
                    })}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        <div className="pl-7.5">
          <MarkdownIcon />
        </div>
        <div className="flex justify-between">
          <div className="flex xl:pl-10.75 flex-col self-center">
            {challenge?.format.disclaimer && (
              <div className="flex flex-row max-w-xm space-x-3 items-center">
                <input type="checkbox" className="xl:w-5 w-10 h-5" name="agree" required checked={checkedTerms} />
                <span className="max-w-none text-sm leading-none">{challenge.format.disclaimer}</span>
              </div>
            )}
          </div>
          <div className="flex text-right self-start">
            <ArrowButton variant="primary" type="submit" disabled={disabled} customStyle={activeButtonStyle} loading={submitting}>
              submit
            </ArrowButton>
          </div>
        </div>
      </form>
    </Section>
  );
}
