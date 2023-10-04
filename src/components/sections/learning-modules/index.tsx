import { useMemo } from "react";
import InteractiveModule from "./InteractiveModule";
import MaterialSection from "./MaterialSection";
import AdditionalMaterialsSection from "@/components/sections/learning-modules/AdditionalMaterials";
import { LearningModule } from "@/types/course";

export default function LearningModuleSection({ learningModule }: { learningModule: LearningModule }) {
  const materials = useMemo(() => learningModule?.materials?.filter((material) => material.type !== "ADDITIONAL") || [], [learningModule?.materials]);
  const additionalMaterials = useMemo(() => learningModule?.materials?.filter((material) => material.type === "ADDITIONAL") || [], [learningModule?.materials]);
  const interactiveModules = learningModule?.interactiveModules || [];

  return (
    <div>
      {materials.map((material, i) => (
        <MaterialSection key={`material-section-${i}`} material={material} />
      ))}
      <AdditionalMaterialsSection materials={additionalMaterials} />
      {interactiveModules.length > 0 && <InteractiveModule data={interactiveModules[0]} />}
      {/* <PageNavigation /> */}
    </div>
  );
}
