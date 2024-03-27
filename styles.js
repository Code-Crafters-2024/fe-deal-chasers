import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 400,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpText: {
    marginTop: 10,
    marginBottom: 5,
  },
  signUpButton: {
    width: "100%",
    height: 40,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },


  /* CATEGORY CARD CSS */

  CategoryContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  categoryCard: {
    position: 'relative',
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    minHeight: 120,
  },
  categoryImage: {
    width: 100,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 12,
  },

  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dropdown: {
    flex: 1,
    marginRight: 5,
    height: 50,
  },
  categoryDropdown: {
    flex: 1,
  },
  sortByDropdown: {
    flex: 1,
  },
  picker: {
    color: 'black',
  },
  pickerItem: {
    color: "#fff",
    fontSize: 10,
  },
  dealsList: {
    flexGrow: 1,
  },

  /* DEALS CARD CSS */
  dealsContainer: {
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  dealsCard: {
    position: 'relative',
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    minHeight: 120,
    
  },
  dealsImage: {
    width: 90,
    height: 90,
    marginRight: 10,
    marginLeft: 5,
  },
  priceText: {
    color: "#FF6347",
    fontSize: 13,
    fontWeight: 'bold',
  },
  dealsInfo: {
    flex: 1,
  },
  dealsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  dealsText: {
    fontSize: 12,
    marginBottom: 2,
  },
  shareContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  dealsShareImage: {
    width: 30,
    height: 30,
  },
  resetButton: {
    backgroundColor: "#FF6347",
    padding: 5,
    marginVertical: 5,
    alignSelf: "center",
    marginHorizontal: 0,
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  getDealButton: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#FF6347', 
  },
  singleDealsCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    height: 150,
  },
  singleDealsCommentsCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    height: 230,
  },
  singleDealContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 160,
    marginTop: 80,
  },
  singleDealsInfo: {
    flex: 1,
    flexDirection: "column",
  },
  singleDealsText: {
    fontSize: 12,
    marginBottom: 3,
  },
  singleDealsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
    flex: 0.5,
    alignItems: "stretch",
  },
  commentsList: {
    alignItems: "center",
  },
  getDealText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    backgroundColor: "white",
    padding: 5,
    marginVertical: 10,
  },
});

