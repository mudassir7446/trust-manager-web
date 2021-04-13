import { Doctor } from './doctor';
/**
 * Represents the Case model for the trust manager
 */

import { Beneficiary } from "./beneficiary";
import { Hospital } from "./hospital";

export class Case
{
  constructor(public caseId: string, public beneficiary: Beneficiary, public hospital: Hospital, public doctor: Doctor, public status: string)
  {

  }
}
