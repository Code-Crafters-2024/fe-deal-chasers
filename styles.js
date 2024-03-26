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

  /* DEALS CARD CSS */
  dealsContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  dealsCard: {
    position: 'relative',
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
    minHeight: 120,
  },
  dealsImage: {
    width: 100,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
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
    width: 20,
    height: 20,
  },
  resetButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: "center",
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});