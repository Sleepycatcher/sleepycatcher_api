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

const test = {
  date: "2023-03-20",
  bedtime: "23:00",
  waketime: "07:00",
  total_sleep_time: 8.0,
  sleep_cycles: [
    {
      cycle_number: 1,
      start_time: "23:00",
      end_time: "00:30",
      duration: 1.5,
      sleep_stage: "Light",
    },
    {
      cycle_number: 2,
      start_time: "00:30",
      end_time: "02:00",
      duration: 1.5,
      sleep_stage: "Deep",
    },
    {
      cycle_number: 3,
      start_time: "02:00",
      end_time: "03:30",
      duration: 1.5,
      sleep_stage: "Light",
    },
    {
      cycle_number: 4,
      start_time: "03:30",
      end_time: "05:00",
      duration: 1.5,
      sleep_stage: "REM",
    },
    {
      cycle_number: 5,
      start_time: "05:00",
      end_time: "06:30",
      duration: 1.5,
      sleep_stage: "Light",
    },
  ],
  sleep_score: 85,
};
