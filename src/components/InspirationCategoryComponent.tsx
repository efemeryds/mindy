import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonItem,
  IonLabel,
  IonAvatar,
  IonCardContent,
  IonList,
} from "@ionic/react";
import { Inspiration, InspirationCategory } from "../models/Inspirations";

interface InspirationCategoryProps {
  category: InspirationCategory;
  items: Inspiration[];
}

const InspirationCategoryComponent: React.FC<InspirationCategoryProps> = ({
  category,
  items,
}) => {
  return (
    <>
      <IonCard className="speaker-card">
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="speaker-item">
            <IonAvatar slot="start">
              <img
                src={process.env.PUBLIC_URL + category.categoryImage}
                alt={category.categoryName}
              />
            </IonAvatar>
            <IonLabel>
              <h2>{category.categoryName}</h2>
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          <IonList lines="none">
            {items.map((item) => (
              <IonItem
                detail={false}
                routerLink={`/tabs/inspirations/${category.id}/${item.id}`}
                key={item.id}
              >
                <IonLabel>
                  <h3>{item.title}</h3>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default InspirationCategoryComponent;
