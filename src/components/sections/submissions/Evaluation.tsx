// // TODO: Will be uncommented when the challenge folder is migrated
// // import RatingRubric from "@/components/sections/challenges/Rubric";
// import EvaluationCard from "@/components/cards/Evaluation";
// import Coin from "@/components/ui/Coin";
// import { useTranslation } from "next-i18next";
// import { useSelector } from "@/hooks/useTypedSelector";

// const SubmissionList = () => {

// interface SubmissionEvaluation{

// }

//   const { t } = useTranslation();
//   // TODO: Will be uncommented when the challenge slice is migrated
//     // const submission = useSelector(
//     //   (state) => state.submissions.current
//     // );
//   const colors = useSelector((state) => state.ui.colors);
//   // TODO: Will be uncommented when the challenge slice is migrated
//   const evaluation = submission.evaluation;
//   //   const totalPoints = submission.challenge.ratingCriteria.reduce(
//   //     (sum, criteria) => sum + criteria.maxPoints,
//   //     0
//   //   );

//   return (
//     <EvaluationCard evaluation={evaluation}>
//       {/* TODO: Will be uncommented when the challenge slice is migrated */}
//       {/* {submission.challenge && (
//         <RatingRubric
//           hideTitle
//           ratingCriteria={submission.challenge.ratingCriteria}
//           selected={evaluation.criteria}
//         />
//       )} */}
//       <div className="grid grid-cols-1 space-y-4 md:space-y-0 md:grid-cols-2 lg:grid-cols-4 mt-3 gap-y-5 gap-x-5">
//         <div className="text-sm">
//           <span className="block font-medium">
//             {t("communities.challenge.evaluation.total")}
//           </span>
//           <span
//             className="text-xl"
//             style={{
//               color: colors.textAccent,
//             }}
//           >
//             {evaluation.points}
//           </span>
//           <span
//             style={{
//               color: colors.textAccent,
//             }}
//           >
//             /{evaluation.totalPoints}{" "}
//             {t("communities.challenge.evaluation.points")}
//           </span>
//         </div>
//         {evaluation.reward && (
//           <div className="text-sm relative">
//             <span className="block font-medium">
//               {t("communities.challenge.evaluation.total")}
//             </span>
//             <div className="absolute -left-5 top-7">
//               <Coin token={evaluation.reward.token} size="small" />
//             </div>
//             <div
//               className="inline-block font-medium"
//               style={{
//                 color: colors.textAccent,
//               }}
//             >
//               <span className="text-xl">
//                 {evaluation.reward.amount}
//               </span>
//               <span>{evaluation.reward.token}</span>
//             </div>
//             <div>{t("communities.challenge.evaluation.message")}</div>
//           </div>
//         )}
//       </div>
//     </EvaluationCard>
//   );
// };
