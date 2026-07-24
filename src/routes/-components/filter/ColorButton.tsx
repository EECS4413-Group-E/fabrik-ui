import { ToggleButton } from "@mui/material";

export default function FilterBox() {

    <ToggleButton
        value="green"
        selected={colorsSelected.includes("green")}
        onChange={() => {
            if (colorsSelected.includes("green")) {
                colorsSelected.splice(colorsSelected.indexOf("green"), 1);
                console.log("Removed green");
            } else {
                colorsSelected.push("green");
                console.log("Added green");
            }
            console.log(colorsSelected);
        }}
    >
        Green
    </ToggleButton>
}