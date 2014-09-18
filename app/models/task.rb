class Task < ActiveRecord::Base
  attr_accessible :description, :project_id, :title, :schedule_date
	belongs_to :project
end
