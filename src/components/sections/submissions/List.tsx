// import { useEffect, useState } from "react";
// import InfiniteLoading from "vue-infinite-loading";
// import Section from "@/components/sections/communities/_partials/Section.vue";
// import SubmissionCard from "@/components/cards/Submission";
// import Loader from "@/components/ui/button/Loader";
// import EmptyState from "@/components/ui/EmptyState";
// import { useDispatch } from "@/hooks/useTypedDispatch";
// import { useSelector } from "@/hooks/useTypedSelector";

// const SubmissionList = () => {
//   const dispatch = useDispatch();
//   const submissions = useSelector(
//     (state) => state.communities.challenges.submissions.list
//   );
//   const community = useSelector((state) => state.communities.current);
//   const [showButton, setShowButton] = useState(true);
//   const [page, setPage] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const showLoadMore = showButton && submissions.length >= 30;

//   const nextPage = async ($state) => {
//     if (loading || !showButton) {
//       $state.complete();
//       return;
//     }
//     setLoading(true);
//     const submissionId =
//       submissions[submissions.length - 1]?.id || null;
//     const list = await dispatch(
//       "communities/challenges/submissions/all",
//       {
//         slug: community.slug,
//         startAfter: submissionId,
//         challengeId: $route.params.challenge_id,
//       }
//     );
//     setPage(page + 1);
//     setLoading(false);

//     if (!list.length) {
//       setShowButton(false);
//       $state.complete();
//       return;
//     }

//     $state.loaded();
//   };

//   useEffect(() => {
//     return () => {
//       setShowButton(true);
//       setPage(0);
//       setLoading(false);
//     };
//   }, []);

//   return (
//     <Section key={page}>
//       {submissions && submissions.length ? (
//         <div className="sm:border sm:border-gray-200 sm:border-solid rounded-3.5xl relative">
//           <div className="flex flex-col divide-y">
//             {submissions.map((submission, i) => (
//               <SubmissionCard
//                 key={submission.id}
//                 preview={true}
//                 link={navigation.community.submissionPath(
//                   submission.id
//                 )}
//                 submission={submission}
//                 last={i === submissions.length - 1 && !showLoadMore}
//               />
//             ))}
//           </div>
//           <Loader
//             loading={loading}
//             className="sm:absolute sm:left-6 sm:-bottom-7.5"
//             onClick={nextPage}
//           />
//         </div>
//       ) : (
//         <div className="lg:w-2/3">
//           <EmptyState
//             title="$t('submissions.empty-state.title')"
//             subtitle="$t('submissions.empty-state.subtitle')"
//           />
//         </div>
//       )}
//       <InfiniteLoading
//         className="invisible"
//         distance={1000}
//         onInfinite={nextPage}
//       />
//     </Section>
//   );
// };
