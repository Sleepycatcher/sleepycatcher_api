import { array, object, string } from "yup";

export const createStatSchema = object({
  body: object({
    date: string().required("Date is required"),
    bedtime: string().required("Bedtime is required"),
    waketime: string().required("Waketime is required"),
    total_sleep_time: string().required("Total sleep time is required"),
    sleep_cycles: array(
      object({
        cycle_number: string().required("Cycle number is required"),
        start_time: string().required("Start time is required"),
        end_time: string().required("End time is required"),
        duration: string().required("Duration is required"),
        sleep_stage: string().required("Sleep stage is required"),
      })
    ),
    sleep_score: string().required("Sleep score is required"),
  }),
});
