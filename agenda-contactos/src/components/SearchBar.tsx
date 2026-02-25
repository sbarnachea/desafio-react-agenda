import { useRef } from 'react';
import { Input } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface Props {
  value: string;
  onSearch: (value: string) => void;
  onClear: () => void;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onSearch, onClear, onChange }: Props) => {
  const inputRef = useRef<any>(null);

  const handleClear = () => {
    onClear();
  };

  return (
    <Input
      ref={inputRef}
      placeholder='Input search text'
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        if (val === '') {
          onClear();
        } else {
          onChange(val);
        }
      }}
      onPressEnter={() => onSearch(value)}
      suffix={
        value ? (
          <CloseCircleOutlined
            onClick={handleClear}
            style={{ cursor: 'pointer', color: '#bfbfbf' }}
          />
        ) : (
          <SearchOutlined style={{ color: '#bfbfbf' }} />
        )
      }
      style={{ marginBottom: 16 }}
    />
  );
};

export default SearchBar;
