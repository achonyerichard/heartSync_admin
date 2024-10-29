import React from "react";

const EmptyState = ({ text }: { text: string }) => {
  return (
    <div className="mt-5 flex flex-col items-center gap-y-6 lg:mt-20">
      <div className="heart-Circle">
        <div className="heart-Container broken">
          <div className="left-Side sides">
            <div className="half">
              <div className="heart"></div>
            </div>

            <div className="points">
              <div className="point pt1"></div>
              <div className="point pt4"></div>
              <div className="point pt2"></div>
              <div className="point pt3"></div>
            </div>
          </div>

          <div className="right-Side sides">
            <div className="half">
              <div className="heart"></div>
            </div>

            <div className="points">
              <div className="point pt1"></div>
              <div className="point pt2"></div>
              <div className="point pt3"></div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-primary">No {text} available.</h2>
    </div>
  );
};

export default EmptyState;
