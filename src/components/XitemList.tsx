import React from 'react'
import "../assets/css/xitem.css"

interface XItemListProps {
    XItems: any[],
    setXItems: (v: any[])=>void
};

export default function XItemList(props: XItemListProps) {
    const onXClicked = (value: String) => {
        const classificationDeleteEndpoint = 'http://localhost:8000/classifications/delete'
        fetch(classificationDeleteEndpoint, {
            method: 'DELETE',
            body: JSON.stringify({
                username: 'Edward',
                id: 0
            })
        })

        // TODO: fetch list again
        const classificationsEndpoint = 'http://localhost:8000/classifications'
        fetch(classificationsEndpoint, {
            method: 'GET',
            body: JSON.stringify({
                username: 'Edward'
            })
        }).then((r: any) => {
            props.setXItems(r)
        })
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