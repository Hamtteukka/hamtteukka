import CheckboxBlank from '/public/svg/checkboxBlankIcon.svg';
import CheckboxChecked from '/public/svg/checkboxCheckedIcon.svg';

interface PCheckboxIcon {
  checked: boolean;
}

const CheckboxIcon: React.FC<PCheckboxIcon> = ({ checked }) => {
  return checked ? <CheckboxChecked /> : <CheckboxBlank />;
};

export default CheckboxIcon;
