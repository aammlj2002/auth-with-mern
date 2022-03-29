import React from "react";
const InputText = (props) => {
    return (
        <input
            type="text"
            className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
            value={props.value}
            onChange={props.onChange}
        />
    );
};
export default InputText;
