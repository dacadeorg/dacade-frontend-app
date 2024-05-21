import { CSSProperties, useState, useMemo} from "react";
import Section from "@/components/sections/communities/_partials/Section";
import Avatar from "@/components/ui/Avatar";
import TextInput from "@/components/ui/TextInput";
import GithubLinkInput from "@/components/ui/GithubLinkInput";
import MarkdownIcon from "@/components/ui/MarkdownIcon";
import ArrowButton from "@/components/ui/button/Arrow";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { createSubmission, createSubmissionTeam } from "@/store/feature/communities/challenges/submissions";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";
import { Submission as TSubmission, User } from "@/types/bounty";
import Hint from "@/components/ui/Hint";
import { fetchChallengeAuthenticated } from "@/store/services/communities/challenges";
import { Colors, Community } from "@/types/community";
import { Challenge } from "@/types/course";
import { Team } from "@/types/challenge";
import { IRootState } from "@/store";

/**
 * interface for Submission multiSelector
 * @date 9/13/2023 - 9:07:18 AM
 *
 * @interface SubmissionMultiSelector
 * @typedef {SubmissionMultiSelector}
 */
interface SubmissionMultiSelector {
  colors: Colors;
  challenge: Challenge | null;
  community: Community | null;
  team: Team;
  authUser: User | null;
  currentSubmission: TSubmission;
}

export interface FormValues {
  text: string;
  githubLink: string;
}

/**
 * Submission form component
 * @date 4/18/2023 - 8:20:10 PM
 *
 * @returns {ReactElement}
 */

const isValid = (form: FormValues, challenge: Challenge | null) => {
  return challenge?.format.githubLink ? form.text.length > 0 && form.githubLink.length > 0 : form.text.length > 0;
};

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

  const { colors, challenge, team, authUser } = useMultiSelector<unknown, SubmissionMultiSelector>({
    colors: (state: IRootState) => state.ui.colors,
    challenge: (state: IRootState) => state.challenges.current,
    team: (state: IRootState) => state.teams.current,
    authUser: (state: IRootState) => state.user.data,
  });

  const [submitting, setSubmitting] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);

  const canSubmit = useMemo(() => {
    if (!challenge?.isTeamChallenge) return true;
    return Boolean(!!team?.organizer);
  }, [challenge?.isTeamChallenge, team?.organizer]);

  /**
   * Button style when it active
   * @date 4/18/2023 - 8:21:41 PM
   *
   * @type {CSSProperties}
   */
  const activeButtonStyle: CSSProperties = {
    color: colors?.text,
    backgroundColor: colors?.textAccent,
  };

  const disabled = submitting || (challenge?.format.disclaimer ? !checkedTerms : false);

  const submissionsClosed = challenge?.expiresAt ? Date.parse(challenge?.expiresAt) < Date.now() : false;

  /**
   * Submit form function
   * @date 4/18/2023 - 8:22:10 PM
   *
   * @async
   * @param {FormValues} form
   * @returns {*}
   */
  const onSubmit = async (form: FormValues) => {
    if (!isValid(form, challenge) || submitting) return;
    try {
      setSubmitting(true);
      await dispatch(
        challenge?.isTeamChallenge
          ? createSubmissionTeam({
              challengeId: challenge?.id,
              text: form.text,
              link: form.githubLink,
            })
          : createSubmission({
              challengeId: challenge?.id,
              text: form.text,
              link: form.githubLink,
            })
      );

      textValue = "";
      githubLinkValue = "";
      dispatch(fetchChallengeAuthenticated({ id: challenge?.id as string }));
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section title={t("communities.challenge.submission")}>
      {submissionsClosed ? (
        <Hint className="mb-8">{t("communities.overview.challenge.submissions-closed")}</Hint>
      ) : (
        <>
          {challenge?.isTeamChallenge && <p className="text-base font-normal text-slate-700 pt-2 pb-7 md:w-182.5"> {t("communities.overview.challenge.submission.description")}</p>}
          {!canSubmit ? (
            <Hint className="mb-8">{t("communities.challenge.submission.hint")}</Hint>
          ) : (
            <form data-testid="submission-form" onSubmit={handleSubmit(onSubmit)}>
              {challenge?.format && (
                <div className="relative w-full md:pl-7.5 my-6">
                  <div className="absolute z-50 left-3 md:left-0 top-3">
                    <Avatar user={team?.organizer || authUser} size="medium" />
                  </div>

                  <div label-for="input-text">
                    <TextInput
                      id="input-text"
                      value={textValue}
                      placeholder={`${t("communities.challenge.submission.placeholder.text")}`}
                      error={errors.text?.message as string}
                      {...register("text", {
                        required: "This field is required",
                        minLength: {
                          value: 15,
                          message: "This field must be at least 15 characters.",
                        },
                      })}
                    />
                  </div>
                  {challenge.format.githubLink && (
                    <div className="w-full m-0 text-lg py-0 leading-none items-center space-x-2">
                      <div>
                        <GithubLinkInput
                          id="input-github"
                          error={errors.githubLink?.message as string}
                          className="p-0 border-none border-transparent focus:outline-none outline-none active:border-none focus:border-none block m-0 flex-grow w-full placeholder-gray-400 placeholder-opacity-100"
                          placeholder={`${t("communities.challenge.submission.placeholder.github")}`}
                          {...register("githubLink", {
                            value: githubLinkValue,
                            required: "This field is required",
                            pattern: {
                              /*
                          This pattern validates a valid GitHub link URL.
                          The URL should follow the format: https://github.com/username/repository.
                        */
                              value: /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/,
                              message: "This value must be a valid Github repository URL",
                            },
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
                      <input type="checkbox" className="xl:w-5 w-10 h-5" name="agree" required onChange={() => setCheckedTerms(!checkedTerms)} checked={checkedTerms} />
                      <span className="max-w-none text-sm leading-none">{challenge.format.disclaimer}</span>
                    </div>
                  )}
                </div>
                <div className="flex text-right self-start">
                  <ArrowButton variant="primary" disabled={disabled} customStyle={activeButtonStyle} loading={submitting}>
                    submit
                  </ArrowButton>
                </div>
              </div>
            </form>
          )}
        </>
      )}
    </Section>
  );
}

