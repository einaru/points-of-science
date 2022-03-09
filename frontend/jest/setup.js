import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import WebSocket from "ws";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

global.WebSocket = WebSocket;
