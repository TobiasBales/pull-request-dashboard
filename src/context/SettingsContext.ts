import * as React from 'react';
import { SettingsService } from 'src/services/SettingsService';

export const SettingsContext = React.createContext<SettingsService>({} as any);
