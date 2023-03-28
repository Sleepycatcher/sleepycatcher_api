export type Stat = {
  date: string;
  bedtime: string;
  waketime: string;
  total_sleep_time: string;
  sleep_cycles: {
    cycle_number: number;
    start_time: string;
    end_time: string;
    duration: string;
    sleep_stage: string;
  }[];
  sleep_score: number;
};
