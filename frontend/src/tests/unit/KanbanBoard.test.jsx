import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import KanbanBoard from "../../components/KanbanBoard.jsx";

describe("KanbanBoard Unit Tests", () => {
  const mockTasks = {
    "1": {
      id: "1",
      title: "Test Task",
      description: "Test description",
      status: "todo",
      priority: "Low",
      category: "Feature",
      attachments: []
    }
  };

  const mockSocket = {
    emit: vi.fn(),
    on: vi.fn(),
    off: vi.fn()
  };

  it("renders Kanban board title", () => {
    render(<KanbanBoard tasks={mockTasks} socket={mockSocket} />);

    expect(
      screen.getByText("Kanban Board")
    ).toBeInTheDocument();
  });

  it("renders all columns", () => {
    render(<KanbanBoard tasks={mockTasks} socket={mockSocket} />);

    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("renders a task in the correct column", () => {
    render(<KanbanBoard tasks={mockTasks} socket={mockSocket} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });
});