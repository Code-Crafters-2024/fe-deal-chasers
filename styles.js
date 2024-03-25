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
  CategoryContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
    height: 90,
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
  },
  categoriesList: {
    alignItems: "center",
  },
  dealsCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
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
  dealsList: {
    alignItems: "center",
  },
  dealsImage: {
    width: 100,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  dealsContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  dealsInfo: {
    flex: 1,
    flexDirection: "column",
  },
  dealsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
    flex: 0.5,
    alignItems: "stretch",
  },
  dealsText: {
    fontSize: 12,
    marginBottom: 3,
  },
  dealsPrice: {
    fontSize: 12,
    marginBottom: 3,
    fontWeight: "bold",
  },
  shareButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
  },
  shareButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  dealsTitleBox: {
    backgroundColor: "yellow",
  },
  dealsInfoColumns: {
    width: "50%",
    padding: 5,
  },
  dealsColumnContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  dealsShareImage: {
    height: 45,
    width: 45,
  },
});
