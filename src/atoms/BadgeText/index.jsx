import { Badge } from "@chakra-ui/react";

const index = (props) => {
    return (
        <Badge
            textTransform="none"
            my={"auto"}
            rounded={"full"}
            bgColor={props.color}
            color={props.textColor}>
            {props.text}
        </Badge>
    );
};
export default index;
