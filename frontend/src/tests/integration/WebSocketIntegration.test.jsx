import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import KanbanBoard from "../../components/KanbanBoard";

describe("WebSocket Integration Test", () => {
  it("updates UI when task data changes (socket sync simulation)", () => {
    const mockSocket = {
      emit: vi.fn(),
      on: vi.fn(),
      off: vi.fn()
    };

    const initialTasks = {
      "1": {
        id: "1",
        title: "Initial Task",
        description: "Initial desc",
        status: "todo",
        priority: "Low",
        category: "Feature",
        attachments: []
      }
    };

    const { rerender } = render(
      <KanbanBoard tasks={initialTasks} socket={mockSocket} />
    );

    expect(screen.getByText("Initial Task")).toBeInTheDocument();

    const updatedTasks = {
      "1": {
        ...initialTasks["1"],
        title: "Updated Task"
      }
    };

    act(() => {
      rerender(
        <KanbanBoard tasks={updatedTasks} socket={mockSocket} />
      );
    });

    expect(screen.getByText("Updated Task")).toBeInTheDocument();
  });
});