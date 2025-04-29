import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';



function AutocompleteSelect({label,value,setValue,options,style={}}) {
 
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Autocomplete
      value={value}
      style={style}
      onChange={(event, newValue) => {
        setValue(newValue); // Seules les options de la liste sont acceptées
      }}
      inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }
      }
      options={options}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label={label} 
          error={value === null && inputValue !== ''} // Affiche une erreur si texte non valide
          helperText={value === null && inputValue !== '' ? "Sélectionnez une option valide" : ""}
        />
      )}
      // Désactive la saisie libre (obligation de choisir dans la liste)
      freeSolo={false} // Par défaut à false, mais explicite ici
      filterOptions={(options, state) => {
        return options.filter(option =>
          option.toLowerCase().startsWith(state.inputValue.toLowerCase())
        )}}
      />
  );
}

export default AutocompleteSelect;