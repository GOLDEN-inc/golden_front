import React from "react";
import { Alert } from "reactstrap";

const ErrorComponent = (props) => {
    <div>
        <Alert color={props.color}>{props.text}</Alert>
    </div>;
};

export default ErrorComponent;
