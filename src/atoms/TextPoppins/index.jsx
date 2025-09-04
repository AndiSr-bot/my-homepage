/* eslint-disable react/prop-types */
// Library UI
import { Text } from "@chakra-ui/react";
export const TextPoppins = (props) => {
    const renderText = () => {
        let { text = "text" } = props;
        text = text.toString();
        // Jika terdapat tag <b></b>, maka buat tebal
        if (text.includes("<b>") && text.includes("</b>")) {
            const parts = text.split(/<b>|<\/b>/);
            return (
                <Text
                    noOfLines={props.overFlow}
                    fontFamily="Poppins, sans-serif"
                    textAlign={props.textAlign}
                    fontSize={props.fontSize}
                    fontWeight={props.fontWeight}
                    color={props.color ? props.color : "rgba(43, 44, 90, 1)"}>
                    {parts[0]}
                    <strong>{parts[1]}</strong>
                    {parts[2]}
                </Text>
            );
        } else {
            return (
                <Text
                    noOfLines={props.overFlow}
                    fontFamily="Poppins, sans-serif"
                    textAlign={props.textAlign}
                    fontSize={props.fontSize}
                    fontWeight={props.fontWeight}
                    color={props.color ? props.color : "rgba(43, 44, 90, 1)"}>
                    {text}
                </Text>
            );
        }
    };

    return renderText();

    // return (

    //     <Text
    //         noOfLines={props.overFlow}
    //         fontFamily="Poppins, sans-serif"
    //         textAlign={props.textAlign}
    //         fontSize={props.fontSize}
    //         fontWeight={props.fontWeight}
    //         color={props.color ? props.color : "rgba(43, 44, 90, 1)"}>
    //         {props.text}
    //     </Text>
    // );
};
