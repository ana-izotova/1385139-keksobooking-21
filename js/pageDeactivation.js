'use strict';

const deactivateElements = (fields) => fields.forEach((field) => field.setAttribute(`disabled`, true));

const pageDeactivation = () => {
  deactivateElements(adFormFieldsets);
  deactivateElements(mapFilters);
  pageActivationHandlers();
};

pageDeactivation();
