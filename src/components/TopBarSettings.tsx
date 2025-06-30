import { TopBar, TopBarLeft, TopBarRight, CountrySelect } from "@/styles";
import type { Country } from "@/types/types";

type TopBarProps = {
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  availableCountries: Country[];
};

export function TopBarSettings({
  selectedCountry,
  setSelectedCountry,
  availableCountries,
}: TopBarProps) {
  return (
    <TopBar>
      <TopBarLeft>
        <div>📅 Task Calendar</div>
        <div>⭐</div>
        <div>❌ Travidux, LLC</div>
        <div>BC</div>
        <div>👥 Team Visible</div>
      </TopBarLeft>
      <TopBarRight>
        <CountrySelect
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {availableCountries.map((country) => (
            <option key={country.countryCode} value={country.countryCode}>
              {country.name}
            </option>
          ))}
        </CountrySelect>
        <div>📅 Calendar</div>
        <div>⋯ Share</div>
      </TopBarRight>
    </TopBar>
  );
}
