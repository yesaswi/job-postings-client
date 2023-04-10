// /interfaces/interfaces.ts
export interface Job {
    title: string;
    externalPath: string;
    locationsText: string;
    postedOn: string;
    bulletFields: string[];
    [key: string]: any; // Add this line
  }
  
  export interface ApiResponse {
    jobs: Job[];
  }
  