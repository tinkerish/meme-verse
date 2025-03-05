import { useCallback, useMemo, useState } from "react";
import { Tabs } from "../components/Tabs.tsx";
import { TabComponent } from "../types/common.ts";
import EditComponent, {
  MultiStepFormProps,
} from "../components/MultiStepForm/index.tsx";
import PreviewComponent, {
  PreviewProps,
} from "../components/Preview/index.tsx";
import { Meme } from "../store/formStore.tsx";

const AddMemePageComponent = () => {
  const [memeData, setMemeData] = useState<Partial<Meme>>();
  const [tab, setTab] = useState(0);
  const handleMemeData = useCallback((meme: Partial<Meme>) => {
    setMemeData(meme);
  }, []);
  const tabChangeHandler = (index: number) => {
    setTab(index);
  };
  // const tabs: TabComponent[] = useMemo(() => {
  //   return [
  //     {
  //       title: "Edit",
  //       component: EditComponent,
  //       props: {
  //         id: "tabpanel",
  //         ariaLabelledBy: "tab",
  //         handleMemeData: handleMemeData,
  //       },
  //     },
  //     {
  //       title: "Preview",
  //       component: PreviewComponent,
  //       props: { id: "tabpanel", ariaLabelledBy: "tab", memeData: memeData },
  //     },
  //   ];
  // }, [handleMemeData, memeData]);
  const tabs: [TabComponent<MultiStepFormProps>, TabComponent<PreviewProps>] =
    useMemo(
      () => [
        {
          title: "Edit",
          component: EditComponent,
          props: {
            id: "tabpanel",
            ariaLabelledBy: "tab",
            handleMemeData: handleMemeData,
          },
        },
        {
          title: "Preview",
          component: PreviewComponent,
          props: {
            id: "tabpanel",
            ariaLabelledBy: "tab",
            memeData: memeData as Meme,
          },
        },
      ],
      [handleMemeData, memeData]
    );

  return (
    <div className="flex flex-col items-center py-14">
      <Tabs value={tab} onChange={tabChangeHandler} tabs={tabs}></Tabs>
    </div>
  );
};

export default AddMemePageComponent;
