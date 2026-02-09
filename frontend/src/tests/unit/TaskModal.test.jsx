import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import TaskModal from "../../components/TaskModal";

describe("TaskModal Unit Tests", () => {
  const mockOnSave = vi.fn();
  const mockOnClose = vi.fn();
  const mockOnDelete = vi.fn();

  it("renders in create mode", () => {
    render(
      <TaskModal
        mode="create"
        task={{}}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText("Add Task")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
  });

  it("allows user to type title and description", () => {
    render(
      <TaskModal
        mode="create"
        task={{}}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "My Task" }
    });

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "My Description" }
    });

    expect(screen.getByDisplayValue("My Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("My Description")).toBeInTheDocument();
  });

  it("calls onSave with correct data when Add is clicked", () => {
    render(
      <TaskModal
        mode="create"
        task={{}}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "New Task" }
    });

    fireEvent.click(screen.getByText("Add"));

    expect(mockOnSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Task",
        priority: "Low",
        category: "Feature"
      })
    );
  });

  it("shows error message for invalid file type", () => {
    render(
      <TaskModal
        mode="create"
        task={{}}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />
    );

    const fileInput =
      screen.getByText("Choose File").querySelector("input");

    const invalidFile = new File(["dummy"], "virus.exe", {
      type: "application/x-msdownload"
    });

    fireEvent.change(fileInput, {
      target: { files: [invalidFile] }
    });

    expect(
      screen.getByText(/only images.*pdf/i)
    ).toBeInTheDocument();
  });

  it("accepts valid image upload", () => {
    render(
      <TaskModal
        mode="create"
        task={{}}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />
    );

    const fileInput =
      screen.getByText("Choose File").querySelector("input");

    const validFile = new File(["dummy"], "image.png", {
      type: "image/png"
    });

    fireEvent.change(fileInput, {
      target: { files: [validFile] }
    });

    expect(
      screen.queryByText(/only images.*pdf/i)
    ).not.toBeInTheDocument();
  });
});