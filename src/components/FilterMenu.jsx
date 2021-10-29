import React from "react";
import { View, Picker, StyleSheet } from "react-native";

const FilterMenu = ({ selectedValue, setSelectedValue }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 185 }}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Select an item..."/>
        <Picker.Item label="Latest repository" value="Latest" />
        <Picker.Item label="Highest rated repositories" value="Highest" />
        <Picker.Item label="Lowest rated repositories" value="Lowest" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});

export default FilterMenu;