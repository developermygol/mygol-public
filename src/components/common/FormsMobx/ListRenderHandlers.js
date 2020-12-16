import React from 'react';
import { findByIdInArray } from '../../helpers/Data';
import { Localize } from '../Locale/Loc';
import { getFormattedDate, getFormattedDateTime } from './Utils';
import { getUploadsImg, validJsonString } from '../../helpers/Utils';

// __ Render handlers _________________________________________________________

// This is the basic value getter: returns a value from inside nested objects. No array support.
export const getNestedValue = (target, propName) => {
  if (typeof target === 'undefined') return false;

  const i = propName.indexOf('.');
  if (i > -1) {
    return getNestedValue(target[propName.substring(0, i)], propName.substr(i + 1));
  }

  return target[propName];
};

export function setNestedValue(target, propName, value) {
  var i = propName.indexOf('.');

  if (i > -1) {
    const targetProp = propName.substring(0, i);
    const nextProp = propName.substr(i + 1);

    if (typeof target[targetProp] === 'undefined') target[targetProp] = {};

    setNestedValue(target[targetProp], nextProp, value);
    return;
  }

  target[propName] = value;
}

export const textLookup = (localizationBase, dataField) => {
  return selectedRow => {
    const value = getNestedValue(selectedRow, dataField);
    if (value === false) return '';

    return Localize(localizationBase + value);
  };
};

export const arrayLookup = (dataTable, dataField, labelField) => {
  return selectedRow => {
    const value = getNestedValue(selectedRow, dataField);
    return dataTable[value][labelField];
  };
};

export const lookupById = (dataTable, idField, labelField) => {
  return selectedRow => {
    if (!dataTable) return;
    const id = selectedRow[idField];
    const lookupRow = findByIdInArray(dataTable, id);
    if (!lookupRow) return null;

    return lookupRow[labelField];
  };
};

export const formattedDate = dateField => {
  return selectedRow => {
    return getFormattedDate(selectedRow[dateField]);
  };
};

export const formattedDateTime = dateField => {
  return selectedRow => {
    return getFormattedDateTime(selectedRow[dateField]);
  };
};

export const logo = (logoField, idField, type = 'user', className = '') => {
  return selectedRow => {
    const img = getNestedValue(selectedRow, logoField);
    const id = getNestedValue(selectedRow, idField);
    return getUploadsImg(img, id, type, className);
  };
};

export const rankHandler = (row, columnDefinition, index) => {
  return index + 1;
};

export const rankHandlerClassification = (row, columnDefinition, index, stage) => {
  const colorConfig = stage.colorConfig ? validJsonString(stage.colorConfig) : null;
  const position = index + 1;
  let colorAssigned = null;

  if (colorConfig) {
    const assignedColorConfig = colorConfig.find(c => position >= c.start && position <= c.end);
    if (assignedColorConfig) colorAssigned = assignedColorConfig.color;
  }

  if (colorAssigned)
    return (
      <p className="ColoredRank">
        <span className="RankColor" style={{ backgroundColor: colorAssigned }}></span>
        <span className="Rank">{position}</span>
      </p>
    );

  return position;
};

export const goalsConceadedDividedByGamesPlayedHandler = (row, columnDefinition, index) => {
  return Math.round((row.pointsAgainst / row.gamesPlayed) * 100) / 100;
};
