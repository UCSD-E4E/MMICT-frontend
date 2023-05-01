import React from 'react'
import "../assets/css/xitem.css"

interface XItemListProps {
    XItems: String[],
    setXItems: (v: String[])=>void
};

export default function XItemList(props: XItemListProps) {
    const onXClicked = (value: String) => {
        console.log('clicked x')
        // TODO: update routes 
        fetch('')

        // TODO: update routes
        // props.setXItems(
            
        // )
    }

    return (
        <div className="XItemList">
            {React.Children.map(props.XItems, (item) => (
                <div className="XItem">
                    <div>{item}</div>
                    <div onClick={() => onXClicked(item)}>x</div>
                </div>
            ))}
        </div>
    )
}