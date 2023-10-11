import { Transcript } from "./Transcript"

export type Vod = {
  transcript: Transcript
  vodid: string
  title: string
  date: string
  url: string
  thumbnail: string
  view_count: string
  online_intend_date: string
  duration: number
}