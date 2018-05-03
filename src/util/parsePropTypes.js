import T from "prop-types";

const mutatePropType = (name, object = T[name]) => {
  object.type = { ...object.type, name };
  if (object.isRequired) {
    object.isRequired.required = true;
    Object.keys(object)
      .filter(key => !["isRequired"].includes(key))
      .forEach(key => {
        object.isRequired[key] = object[key];
      });
    mutatePropType(name, object.isRequired);
  }
};

const mutatePropTypeFn = name => {
  const original = T[name];
  T[name] = arg => {
    const object = original(arg);
    // arrayOf
    if (typeof arg === "function" && arg.name.indexOf("checkType") >= 0) {
      object.type = { value: parsePropTypeMethod(arg).type };
      // instanceOf
    } else if (typeof arg === "function") {
      object.type = { value: arg.name };
      // oneOfType
    } else if (Array.isArray(arg) && typeof arg[0] === "function") {
      object.type = {
        value: arg.map(method => parsePropTypeMethod(method).type)
      };
      // shape
    } else if (!Array.isArray(arg) && typeof arg === "object") {
      object.type = { value: parsePropTypes({ propTypes: arg }) };
      // oneOf
    } else {
      object.type = { value: arg };
    }
    mutatePropType(name, object);
    return object;
  };
};

Object.keys(T)
  .filter(type => !["exact", "checkPropTypes", "PropTypes"].includes(type))
  .forEach(type => {
    if (T[type].isRequired) {
      return mutatePropType(type);
    }
    return mutatePropTypeFn(type);
  });

const parsePropTypeMethod = (
  { isRequired, ...method },
  value,
  description
) => ({
  type: {
    name: "custom"
  },
  required: false,
  ...(typeof value !== "undefined" ? { defaultValue: { value } } : {}),
  ...method,
  description
});

const parsePropTypes = ({
  propTypes = {},
  defaultProps = {},
  propDescriptions = {}
}) =>
  Object.keys(propTypes).reduce(
    (parsed, prop) => ({
      ...parsed,
      [prop]: parsePropTypeMethod(
        propTypes[prop],
        defaultProps[prop],
        propDescriptions[prop]
      )
    }),
    {}
  );

export default parsePropTypes;
