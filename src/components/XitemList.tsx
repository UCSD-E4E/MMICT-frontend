// Keyboard alternatives for mouse events not needed
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

import "../assets/css/xitem.css";
import ApiService from "../services/ApiService";

interface XItemListProps {
  XItems: any[];
  setXItems: (v: any[]) => void;
}

export default function XItemList(props: XItemListProps) {
  const onXClicked = (value: string) => {
    const classificationDeleteEndpoint = `${ApiService.getApiServiceUrl()}/delete`;
    fetch(classificationDeleteEndpoint, {
      method: "DELETE",
      body: JSON.stringify({
        username: value,
        id: 0,
      }),
    });

    // Fetch list again
    const classificationsEndpoint = `${ApiService.getApiServiceUrl()}/classifications`;
    fetch(classificationsEndpoint, {
      method: "GET",
      body: JSON.stringify({
        username: "Edward",
      }),
    }).then((ret: any) => {
      props.setXItems(ret);
    });
    // props.setXItems(

    // )
  };

  return (
    <div className="XItemList">
      {React.Children.map(props.XItems, (item) => (
        <div className="XItem">
          <div>{item}</div>
          {/* eslint-disable-next-line @shopify/jsx-no-hardcoded-content*/}
          <div onClick={() => onXClicked(item)}>x</div>
        </div>
      ))}
    </div>
  );
}
