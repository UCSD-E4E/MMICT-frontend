import "../assets/css/xitem.css"

export default function XItemList(props) {
    const onXClicked = (value) => {
        console.log('clicked x')
        // TODO: update routes 
        fetch('')

        // TODO: update routes
        props.setXItems(
            fetch('', {
                method: 'GET'
            }).classified_img
        )
    }

    return (
        <div className="XItemList">
            {props.XItems.map(item => (
                <div className="XItem" key={item}>
                    <div>{item}</div>
                    <div onClick={() => onXClicked(item)}>x</div>
                </div>
            ))}
        </div>
    )
}