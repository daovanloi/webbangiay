import joi from "joi";
const contactSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Trường tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  email: joi.string().email().required().messages({
    "string.empty": "Trường email không được để trống",
    "string.email": "Trường email không đúng định dạng",
    "any.required": "Trường email là bắt buộc",
  }),
  tel: joi.number().required().messages({
    "string.empty": "Trường phone không được để trống",
    "any.required": "Trường phone là bắt buộc",
  }),
  address: joi.any(),
  message: joi.any(),
});

export default contactSchema;
