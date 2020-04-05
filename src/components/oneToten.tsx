import React from "react";
import "./oneToten.css";
import { IonButton } from "@ionic/react";

interface OneProps {
  set: React.Dispatch<React.SetStateAction<number>>;
}

const OneToTen: React.FC<OneProps> = (props: OneProps) => {
  return (
    <>
      <div>
        <div className="container">
          <div className="row">
            <div className="chart-scale">
              <IonButton
                onClick={(e: any) => {
                  props.set(1);
                }}
                className="btn btn-scale btn-scale-desc-1"
              >
                1
              </IonButton>
              <IonButton
                onClick={(e: any) => {
                  props.set(2);
                }}
                className="btn btn-scale btn-scale-desc-2"
              >
                2
              </IonButton>
              <IonButton
                onClick={(e: any) => {
                  props.set(3);
                }}
                className="btn btn-scale btn-scale-desc-3"
              >
                3
              </IonButton>
              <IonButton
                onClick={(e: any) => {
                  props.set(4);
                }}
                className="btn btn-scale btn-scale-desc-4"
              >
                4
              </IonButton>
              <IonButton
                onClick={(e: any) => {
                  props.set(5);
                }}
                className="btn btn-scale btn-scale-desc-5"
              >
                5
              </IonButton>
              <hr />
            </div>
          </div>
        </div>
        ;
      </div>
    </>
  );
};

export default OneToTen;
