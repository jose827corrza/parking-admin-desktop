import { AuthUser } from "aws-amplify/auth";

export interface AppProps {
  user: AuthUser | undefined;
  signOut: (data?: any) => void;
}

export interface ParkingDashboardProps {
  cars?: CarItem[];
  selectedCarId?: string;
  onSelectCar?: (car: CarItem) => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

export interface CarItem {
  parking_id: string;
  plate_number: string;
  is_premium: boolean;
  ingress_datetime?: string;
  to_pay?: number;
  registry?: Attendance[]
}

export interface Attendance {
    ingress_datetime: string;
    egress_datetime: string;
}