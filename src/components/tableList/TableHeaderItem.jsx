import React from "react";

export default function TableHeaderItem(props) {
    return (
         <th scope="col">{props.children}</th>
    )
}