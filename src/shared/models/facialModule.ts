/************************************************************************************************************
 *                                                                                                          *
 * File: FacialModuleDTO.tsx                                                                                *
 * Author: Adnana Catrinel Dragut                                                                           *
 * Description: properties of the message received from the voice API                                       *
 * Version: 1.0                                                                                             *
 *                                                                                                          *
 ************************************************************************************************************/

export interface FacialModuleDTO {
  task: string;
  mode: string;
  source: string;
  responseMode: string;
  algorithm: string;
  imageBase64?: string;
  imagesBase64?: string[];
  videoChunksBase64?: string;
}
