<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

defineProps({
  isGroup: {
    type: Boolean,
    default: false,
  },
  type: { type: String, require: true },
  label: { type: String, require: true },
  placeholder: { type: String, require: false },
  identity: { type: String, require: true },
  name: { type: String, require: true },
  readonly: { type: String, require: true, default: "0" },
  modelValue: { type: [String, Number] },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div class="input-group mb-3">
    <label
      :for="identity"
      class="form-label fw-semibold w-100 fs-6"
      style="font-size: 14px"
      >{{ label }}<span class="text-danger fw-bolder fs-6"> *</span></label
    >
    <Field
      :type="type"
      :id="identity"
      :placeholder="placeholder"
      :value="modelValue"
      :readonly="readonly === '1'"
      :name="name"
      :class="[
        'form-control ',
        isGroup ? 'rounded-0' : 'border-end-1 rounded-0',
      ]"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <!--    <button-->
    <!--      type="button"-->
    <!--      :class="['input-group-text bg-white ', isGroup ? 'd-none' : '']"-->
    <!--      for="inputGroupFile02"-->
    <!--    >-->
    <!--      <i class="fa-solid fa-eye" style="color: #5c5c5c"></i>-->
    <!--    </button>-->
  </div>
</template>
