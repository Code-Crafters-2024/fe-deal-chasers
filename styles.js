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
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6347",
    padding: 5,
    marginVertical: 5,
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
    borderWidth: 1,
    borderColor: "#FF6347",
    justifyContent: "center",
    alignItems: "center",
  },
  updateProfileButton: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#FF6347",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpButtonText: {
    color: "black",
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
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  picker: {
    color: 'black',
  },
  pickerItem: {
    color: "#fff",
    fontSize: 10,
  },
  commentsList: {
    flexGrow: 1,
  },

  /* DEALS CARD CSS */

  singleDealContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },

  dealsContainer: {
    flexGrow: 1,
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

  dealShareContainer: {
    position: 'absolute',
    right: 10,
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
    marginVertical: 2,
    marginEnd: 40,
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

  /* SINGLE DEALS CSS */
  singleDealsCard: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",

  },
  singleDealsImageContainer: {
    width: "100%",
    height: 250,
  },
  SingleDealsImage: {
    flex: 1,
  },
  singleDealsTextInfo: {
    padding: 10,
    marginBottom: 20,
  },
  singleDealPosted: {
    fontSize: 12,
  },
  singleDealVote: {
    fontSize: 12,
  },
  singleDealTitle: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  singleDealCat: {
    fontSize: 12,
  },
  singleDealBody: {
    fontSize: 12,
  },


  /* SINGLE DEALS COMMENTS CSS */

  singleDealsCommentsCard: {
    position: 'relative',
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
  },
  singleDealsInfo: {
    flex: 1,
  },
  singleDealsText: {
    fontSize: 12,
  },
  singleDealsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
  },

  /* COMMENTS CSS */
  commentsList: {
    alignItems: "center",
  },
  getDealText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  commentsFormContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  commentsFormInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '70%',
  },
  buttonContainer: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  commentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  commentInput: {
    flex: 1,
    height: 35,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginRight: 10,
  },



  /* SEARCH */
  searchContainer: {
    backgroundColor: "white",
    padding: 5,
    marginVertical: 10,
  },


  /* VOTE BUTTONS */
  voteButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#FF6347",

  },
  singleDealVote: {
    marginLeft: 10,
    marginRight: 10,
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },


  /* POST DEAL FORM CSS */
  formContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
  },
 
  datePickerContainer: {
    marginBottom: 20,
    // width: '100%',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 5,
    marginBottom: 5,
    borderRadius: 0,
    backgroundColor: "white",
  },
  categoryDropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  pickerItemLabel: {
    fontSize: 10,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
    color: '#FF6347',
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
    color: '#FF6347',
  },

  /* HOME PAGE CSS */
  homeDealsContainer: {
    marginTop: 10,
    flex: 3,
    marginHorizontal: "auto",
    width: "auto",
    padding: 5,
  },
  HomeDealsList: {
    flexGrow: 1,
    flexDirection: "row",
  },
  todaysDealsCard: {
    position: "center",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 160,
  },
  mostPopularDealsCard: {
    position: "center",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 160,
  },
  todaysDealsImage: {
    width: 160,
    height:160,
  },
  mostPopularDealsImage: {
    width: 160,
    height:160,
  },
  imageViewerImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  cardContent: {
    padding: 5,
    height: 50,
  },
  homeGetDealButton: {
    paddingVertical: 2,
    paddingHorizontal: 7,
    backgroundColor: "#FF6347",
  },
  getDealContainer: {
    marginBottom: 5,
    marginLeft: 5,
  },
  homeGetDealText: {
    color: "white",
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    color: "#FF6347",
  },
  votesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    color: "#FF6347",
  },
  homeDealTitle: {
    fontSize: 12,
  },
  cardPrice: {
    paddingHorizontal: 5,
  },

});