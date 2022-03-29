const errorFormatter = (error) => {
    let errors = {};
    let e = error.message;

    // remove "validation failed: "
    e = e.substring(e.indexOf(":") + 1).trim();

    // split by ","
    e = e.split(",").map((e) => e.trim());

    // push error to key and value to errors object
    e.forEach((err) => {
        const [key, value] = err.split(":").map((e) => e.trim());
        errors[key] = value;
    });
    errors = JSON.stringify(errors);
    return errors;
};
export default errorFormatter;
