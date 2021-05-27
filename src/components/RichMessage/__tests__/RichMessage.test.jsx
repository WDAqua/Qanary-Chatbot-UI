import renderer from "react-test-renderer";
import RichMessage from "../RichMessage";

// Snapshot tests
// Message and Button specific tests are obsolete since they're already covered by the Message and Button components' tests

it("renders correctly with no props", () => {
  const tree = renderer.create(<RichMessage />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders one button with single valid button visualization as input", () => {
  const tree = renderer
    .create(
      <RichMessage
        messageObject={{
          visualization: {
            buttons: [
              {
                title: "test",
              },
            ],
          },
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders two distinct buttons with two valid, distinct button visualization as input", () => {
  const tree = renderer
    .create(
      <RichMessage
        messageObject={{
          visualization: {
            buttons: [
              {
                title: "test",
              },
              {
                title: "test2",
              },
            ],
          },
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders two distinct buttons with two valid, equal button visualizations as input", () => {
  const tree = renderer
    .create(
      <RichMessage
        messageObject={{
          visualization: {
            buttons: [
              {
                title: "test",
              },
              {
                title: "test",
              },
            ],
          },
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders no button with single invalid button visualization", () => {
  const tree = renderer
    .create(
      <RichMessage
        messageObject={{
          visualization: {
            buttons: {
              title: "test",
            },
          },
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
