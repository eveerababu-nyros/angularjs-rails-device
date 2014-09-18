class AddScheduledTimeToTasks < ActiveRecord::Migration
  def change
			add_column :tasks, :schedule_date, :datetime
  end
end
