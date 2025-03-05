import { useMemo } from "react";
import useMemeStore from "../store/formStore";
import RecipeListComponent from "../components/Memes/MemeList";

const LeaderBoard = () => {
  const { mergedMemes } = useMemeStore();
  const mostLikedMemes = useMemo(() => {
    const memes = [...mergedMemes];
    memes.sort((a, b) => b.likes - a.likes);

    return memes.slice(0, 10);
  }, [mergedMemes]);

  return (
    <div className="pt-24 flex flex-col gap-16">
      <h1 className="font-garamond font-black text-9xl text-white capitalize px-16 max-xsm:text-7xl max-xsm:px-10">
        Who is the leader?
      </h1>
      <RecipeListComponent foods={mostLikedMemes} />
    </div>
  );
};

export default LeaderBoard;
