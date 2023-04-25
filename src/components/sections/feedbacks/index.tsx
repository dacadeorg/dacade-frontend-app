import React, { useState } from "react";
import FeedbackCard from "../../cards/Feedback";
import Loader from "../../ui/button/Loader";
import { useSelector } from "@/hooks/useTypedSelector";
import { authCheck } from "@/store/feature/auth.slice";
import Section from "../communities/_partials/Section";
import Criteria from "./Criteria";
import Form from "./Form";

/**
 * Feedback  Component
 * @date 4/25/2023 - 2:23:01 PM
 *
 * @export
 * @returns {*}
 */
export default function Feedback() {
  const feedbacks: any = [];

  const [loading, setloading] = useState(true);

  const isAuthenticated = useSelector((e) => authCheck(e));

  const submission: any = {};

  const fetchList = () => {};
  return (
    <div className="relative">
      {feedbacks.map((feedback: any, k: number) => (
        <FeedbackCard
          key={feedback.id}
          value={feedback}
          last={k === feedbacks.length - 1}
        />
      ))}

      {loading && <Loader loading={loading} />}
      {isAuthenticated && submission.challenge.feedbackInfo && (
        <Section v-if="">
          <Criteria />
          <Form save={fetchList} />
        </Section>
      )}
    </div>
  );
}
